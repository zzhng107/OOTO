### MAKE SURE YOU COMMIT WITH YOUR OWN PRIVILEGES
### Commit with root privileges causes lots of trouble for others to keep track and/or update files

### Layout
All 'static' files (i.e. `*.js`) and and 'template' (i.e. `*.html`) files goes to `frontend` folder
**Make sure you update the corresponding 'template' file if you want your script to be included**
See ["Serving static files"](https://docs.djangoproject.com/en/1.11/howto/static-files/)
and ["Template tags"](https://docs.djangoproject.com/en/1.11/ref/templates/builtins/#)

### Deploy
1. Push your changes
2. `cd /root/OOTO`
3. `git pull origin master`
4. `httpd -k restart`

### Overhaul
Currently, a lot of stuff was hardcoded, and we are yet to familiarize ourselves with Django, therefore I propose that we
'learn-as-we-go', which is to refactor existing codebase along with to add new functionality into project.
