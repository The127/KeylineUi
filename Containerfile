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

expose 80
cmd ["nginx", "-g", "daemon off;"]