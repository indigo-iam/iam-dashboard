pipeline {
  agent none
  stages {
    stage('Build') {
      agent { 
         docker { 
          image 'node:20-alpine'
          label 'docker'
          args '-u root:root'
        }
      }
      steps {
        sh 'npm ci'
        sh 'npm run test'
        sh 'npm run build'
        sh 'chown -R 1007:1007 dist'
        stash includes: 'dist/**/*', name: 'artifact'
      }
    }
    stage('Docker build') {
      agent { 
        label 'docker'
      }
      steps {
        script {
          unstash 'artifact'
          def dockerImage = 'indigoiam/dashboard:latest'
          docker.build(dockerImage)
        }
      }
    }
  }
}