pipeline {
  agent any

  environment {
    DEPLOY_PATH = '/var/www/farmersapp'
    SERVICE_NAME = 'farmers.service'
  }

  stages {
    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Deploy to Local Directory') {
      steps {
        sh '''
          sudo mkdir -p $DEPLOY_PATH
          sudo rm -rf $DEPLOY_PATH/*
          sudo cp -r ./* $DEPLOY_PATH/
          sudo cp -r dist $DEPLOY_PATH/
          sudo chown -R jenkins:jenkins $DEPLOY_PATH
        '''
      }
    }

    stage('Debug Whoami & Sudo') {
      steps {
           sh '''
          echo "Running as: $(whoami)"
          id
          sudo -n -l
    '''
        }
       }


    stage('Restart systemd Service') {
      steps {
        sh '''
          sudo -n systemctl daemon-reload
           sudo -n systemctl restart $SERVICE_NAME
           sudo -n systemctl status $SERVICE_NAME --no-pager
        '''
      }
    }
  }

  post {
    success {
      echo 'Deployed and restarted via systemd successfully!'
    }
    failure {
      echo 'Something went wrong with the deployment.'
    }
  }
}
