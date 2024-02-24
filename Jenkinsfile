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
    stage('Docker Build & Push') {
      agent { 
        label 'docker'
      }
      steps {
        script {
          unstash 'artifact'
          docker.withRegistry('https://registry-1.docker.io', 'docker-cnafsoftwaredevel') {
            def dockerImage = docker.build('cnafsoftwaredevel/iam-dashboard')
            dockerImage.push('latest')
          }
        }
      }
    }
  }
}