import {UserManager} from "oidc-client";
import {ConfigApiUrl, ConfigHost} from "../config.js";

let mgr = null;

export function useUserManager(virtualServer = null) {
    const oidcBaseUrl = ConfigApiUrl()
    const adminUiBaseUrl = ConfigHost()

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
            scope: "openid profile email",
            automaticSilentRenew: true,
        })
    }

    return mgr
}