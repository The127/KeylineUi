import {UserManager} from "oidc-client";
import {useRouter} from "vue-router";

const router = useRouter()

let mgr = null;

const oidcBaseUrl = "http://127.0.0.1:8081"
const adminUiBaseUrl = "http://localhost:5173"

export function useUserManager() {
    if (mgr === null) {
        mgr = new UserManager({
            authority: `${oidcBaseUrl}/oidc/keyline`,
            metadataUrl: `${oidcBaseUrl}/oidc/keyline/.well-known/openid-configuration`,
            client_id: "admin-ui",
            redirect_uri: `${adminUiBaseUrl}/mgmt/keyline/auth`,
            response_type: "code",
            scope: "oidc profile email",
            automaticSilentRenew: true,
        })
    }

    return mgr
}