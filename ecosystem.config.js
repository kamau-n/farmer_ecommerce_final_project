module.exports = {
  apps: [
    {
      name: "farmersapp",
      script: "index.js", // or your main entry file
      cwd: "/var/www/farmersapp",
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 8081
      }
    }
  ]
};
