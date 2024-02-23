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
        sh 'npm ci'
        sh 'npm run build'
      }
    }
  }
}
