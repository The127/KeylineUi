import {UserManager} from "oidc-client";

let mgr = null;

const oidcBaseUrl = "http://127.0.0.1:8081"
const adminUiBaseUrl = "http://localhost:5173"

export function useUserManager(virtualServer = null) {
    if (!virtualServer) {
        console.error("Can only use `useUserManager` inside a route with a `virtualServer` meta property.")
        return null
    }

    if (mgr === null) {
        mgr = new UserManager({
            authority: `${oidcBaseUrl}/oidc/${virtualServer}`,
            metadataUrl: `${oidcBaseUrl}/oidc/${virtualServer}/.well-known/openid-configuration`,
            client_id: "admin-ui",
            redirect_uri: `${adminUiBaseUrl}/mgmt/${virtualServer}/auth`,
            response_type: "code",
            scope: "oidc profile email",
            automaticSilentRenew: true,
        })
    }

    return mgr
}