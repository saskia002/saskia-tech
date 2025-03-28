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
        sudo find /srv/web -type d -exec chmod 700 "{}" \;
        sudo find /srv/web -type f -exec chmod 600 "{}" \;
        ```

    - App setup (make sure .env is present in app root as well, look at exaple.env):

        ```
        cd /serv/web
        git clone https://github.com/saskia002/saskia-tech.git .
        npm cache clean --force
        npm i -f
        npx next telemetry disable
        (sudo) npm run build
        npm run db-migrate-prod
        npm run db-seed
        ```

    - Generate next auth secret, open git bash on windows or linux bash. Run
      `openssl rand -base64 32` and paste the output to `NEXTAUTH_SECRET=` .env variable.

2. Create system service.

    - Copy `web.service` to `/etc/systemd/system`
        - You could alos create a symlink for the service
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

    mkdir && sudo openssl req -x509 -nodes -days 36500 -newkey rsa:4096 \
        -keyout /etc/nginx/ssl/default.key \
        -out /etc/nginx/ssl/default.crt \
        -subj "/C=uu/CN=default"
