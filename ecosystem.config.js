module.exports = {
  apps: [
    {
      name: "farmersapp",
      script: "dist/app.js", 
      cwd: "/var/www/farmersapp",
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 8081
      }
    }
  ]
};
