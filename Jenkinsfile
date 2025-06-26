pipeline {
  agent any

  environment {
    DEPLOY_PATH = '/var/www/farmersapp'
    PM2_CONFIG = 'ecosystem.config.js'
    PM2_PROCESS_NAME = 'farmersapp'
  }

  stages {
    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build (Optional)') {
      steps {
        echo 'No build step for pure Node/Express app — skipping.'
      }
    }

    stage('Deploy to Local Directory') {
      steps {
        sh '''
          mkdir -p $DEPLOY_PATH
          rm -rf $DEPLOY_PATH/*
          cp -r ./* $DEPLOY_PATH/
        '''
      }
    }

    stage('Restart with PM2') {
      steps {
        sh '''
          cd $DEPLOY_PATH

          # Stop old process
          pm2 delete $PM2_PROCESS_NAME || true

          # Start app using ecosystem config
          pm2 start $PM2_CONFIG

          # Save process list
          pm2 save
        '''
      }
    }
  }

  post {
    success {
      echo '🚀 Deployment succeeded using PM2!'
    }
    failure {
      echo '❌ Deployment failed.'
    }
  }
}
