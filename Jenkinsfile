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
        stage('Dockerhub Login') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                    }
                }
            }
        }
        stage('Build and Push Docker Image && Update Version') {
            steps {
                script {
                    def version
                    def imageName = "eaydinkurubacak/my-express-app"
                    def versionFile = '/var/jenkins_home/version.txt'

                    node('built-in') {
                        version = readFile(versionFile).trim().toInteger()
                    }

                    // Docker build işlemi
                    sh "docker build -t ${imageName}:${version} ."
                    sh "docker tag ${imageName}:${version} ${imageName}:latest"

                    try {
                        // Docker push işlemi
                        sh "docker push ${imageName}:${version}"
                        sh "docker push ${imageName}:latest"

                        // Push işlemleri başarılı olursa versiyonu artır
                        node('built-in') {
                            writeFile file: versionFile, text: "${version + 1}"
                        }
                    } catch (Exception e) {
                        println "Docker push failed: ${e.message}"
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    def imageName = "eaydinkurubacak/my-express-app:latest"
                    def containerName = "my-express-app-container"

                    // Docker Hub'dan latest tag'li imajı pull et
                    sh "docker pull ${imageName}"

                    // Var olan bir container varsa onu durdur ve sil
                    sh """
                        if [ \$(docker ps -aq -f name=${containerName}) ]; then
                            docker stop ${containerName}
                            docker rm ${containerName}
                        fi
                    """

                    // Yeni bir container başlat
                    sh """
                        docker container run -d -p 80:5000 --name ${containerName} ${imageName} 
                    """
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
