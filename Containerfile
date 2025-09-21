from node:lts-alpine3.21 as build-stage

workdir /app

run corepack enable

copy pnpm-lock.yaml package.json ./
run pnpm install --frozen-lockfile

copy . .
run pnpm run build

from nginx:stable-alpine3.21 as production-stage

copy --from=build-stage /app/dist /usr/share/nginx/html
copy nginx.conf /etc/nginx/conf.d/default.conf

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

expose 80

ENTRYPOINT ["/entrypoint.sh"]
cmd ["nginx", "-g", "daemon off;"]