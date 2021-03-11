npm run build
cd build
rm static/js/*.map
rm static/css/*.map

heroku apps:destroy --confirm ninjarater-app
heroku apps:create ninjarater-app
git init
heroku git:remote -a ninjarater-app
git add .
git commit -m "Auto-deploy changes"
git push --force heroku master
