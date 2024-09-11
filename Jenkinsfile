pipeline{
    agent{
        label 'docker-agent'
    }

    stages{
        stage("Welcome"){
            steps{
                sh "pwd"
                sh "ls"
            }
        }
        /*
        stage('Build') {
            steps {
                // TypeScript dosyalarını derler
                sh 'npm run build'
            }
        }
        */
        stage('Test') {
            steps {
                // Testleri çalıştırır
                sh 'npm test'
            }
        }
        stage('Build') {
            steps {
                script {
                    def versionFile = '/var/jenkins_home/version.txt'
                    def version = readFile(versionFile).trim().toInteger()

                    // Docker imajını build eder ve versiyonu artırır
                    sh "docker build -t my-express-app:${version} ."
                    writeFile file: versionFile, text: "${version + 1}"
                }
            }
        }        
    }

    post {
        always {
            script {
                // Pipeline tamamlandığında workspace'i temizler
                deleteDir() 
            }
        }
    }

}
