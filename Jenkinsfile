pipeline {
  agent { 
     docker { 
      image 'node:20-alpine'
      label 'docker'
    }
  }
  stages {
    stage('Build') {
      steps {
        sh 'npm cache clean --force'
        sh 'npm install'
        sh 'npm run build'
      }
    }
  }
}
