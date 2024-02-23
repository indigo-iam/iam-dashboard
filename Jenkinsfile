pipeline {
  agent { 
     docker { 
      image 'node:20-alpine'
      label 'docker'
      args '-u node'
    }
  }
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }
  }
}
