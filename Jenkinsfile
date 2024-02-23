pipeline {
  agent { 
     docker { 
      image 'node:20-alpine'
      label 'docker'
      args '-u root:root'
    }
  }
  stages {
    stage('Build') {
      steps {
        script{
          sh 'npm ci'
          sh 'npm run test'
          sh 'npm run build'
          stash includes: 'dist/**', name: 'artifact'
        }
      }
    }
    stage('Docker build') {
      steps {
        script {
          unstash 'artifact'
          def context = 'docker'
          def dockerImage = 'indigoiam/dashboard:latest'
          docker.build(dockerImage, context)
        }
      }
    }
  }
}
