## Requirements

You can find really good quides on how to install sofware onto linux servers on DigitalOcean or in Rocky linux documentation.

    - Node 22 LTS
    - PostgreSQL 16?
    - Nginx
    - Certbot for nginx
    - working firewalld setup :)
    - Git

## Install

NB! Istall all of the requirements before these setps.

1. Make a user and a foler for Next app and the give rights and then copy code and build it.

    - Server folder setup:

        ```
        sudo mkdir /srv/web
        sudo groupadd web
        sudo adduser -G nginx -g web -d /srv/web web --system --shell=/bin/false
        sudo chown -R web:web /srv/web
        ```

    - App setup (make sure .env is present in app root as well, look at exaple.env):

        1. DB:

        ```
        sudo -u postgres psql
        CREATE DATABASE web;
        or
        CREATE ROLE web WITH LOGIN PASSWORD 'securepassword' NOSUPERUSER;
        CREATE DATABASE web WITH OWNER web ENCODING 'UTF8' LC_COLLATE='et_EE.UTF-8' LC_CTYPE='et_EE.UTF-8' TEMPLATE=template0;

        \c web
        ALTER SCHEMA public OWNER TO web;
        ```

        2. App:

        ```
        cd /serv/web
        git clone https://github.com/saskia002/saskia-tech.git .
        npm cache clean --force
        npm i -f
        npx next telemetry disable
        (sudo) npm run build
        npm run db-migrate-prod
        npm run db-seed

        sudo find /srv/web -type d -exec chmod 700 "{}" \;
        sudo find /srv/web -type f -exec chmod 600 "{}" \;
        ```

    - Generate next auth secret, open git bash on windows or linux bash. Run
      `openssl rand -base64 32` and paste the output to `NEXTAUTH_SECRET=` .env variable.

2. Create system service.

    - Copy `web.service` to `/etc/systemd/system`
        - You could also create a symlink for the service
    - Reload system service demon and then enable and start serviss:

        ```
        sudo systemctl daemon-reload
        sudo systemctl enable web
        sudo systemctl start web
        ```

3. Copy nginx.cong to `/etc/nginx`, then test conf and restart it.

    ```
    sudo nginx -t
    sudo systemctl restart nginx
    ```

4. Profit 8-)

## Other

-   (optional) Slect correct TZ: `tzselect`

    Change PostgreSQL timzone:

    ```
    sudo -u postgres psql

    \c web
    SHOW TIMEZONE;
    SELECT * FROM pg_timezone_names;
    \q

    sudo -u postgres psql
    ALTER DATABASE web SET TIMEZONE TO 'EET';
    ```

-   Other commands:

Kill psql processes:

    SELECT pg_terminate_backend(pid)
    FROM pg_stat_activity
    WHERE datname = 'web' AND pid <> pg_backend_pid();

Generate default key for default_server for NGINX:

    mkdir /etc/nginx/ssl && sudo openssl req -x509 -nodes -days 36500 -newkey rsa:4096 \
        -keyout /etc/nginx/ssl/default.key \
        -out /etc/nginx/ssl/default.crt \
        -subj "/C=uu/CN=default"

backing up DB:

    sudo -u postgres pg_dump web > /srv/web/db-backup.sql
    sudo -u postgres psql web < /srv/web/db-backup.sql

     or

    PGPASSWORD="root" pg_dump -U postgres -h localhost -p 5432 -d web -F p -f backup.sql
