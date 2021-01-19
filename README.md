## Deno "tracking server"

just eat everythign and log to console


## Deploy

```
heroku container:push web -a dummy-tracking
heroku container:release web -a dummy-tracking
```

## Logs

```
heroku logs --tail -a dummy-tracking
```

