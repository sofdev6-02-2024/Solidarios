import json
from keycloak import KeycloakAdmin
from keycloak.exceptions import KeycloakPostError, KeycloakGetError

def configure_keycloak():
    keycloak_admin = KeycloakAdmin(
        server_url="http://localhost:8080/auth/",
        username="admin",
        password="admin",
        realm_name="master",
        verify=True
    )

    realm_name = "solidarios-realm"
    realm_representation = {
        "realm": realm_name,
        "enabled": True,
        "registrationAllowed": True,
        "loginTheme": "keycloak",
        "emailTheme": "keycloak",
        "bruteForceProtected": True
    }

    try:
        print(f"Checking if realm '{realm_name}' exists...")
        keycloak_admin.get_realm(realm_name)
        print(f"Realm '{realm_name}' already exists.")
    except KeycloakGetError:
        print(f"Realm '{realm_name}' does not exist. Creating it now...")
        try:
            keycloak_admin.create_realm(payload=realm_representation)
            print(f"Realm '{realm_name}' created successfully.")
        except KeycloakPostError as e:
            print(f"Error creating realm '{realm_name}': {e}")
            return

    keycloak_admin.realm_name = realm_name

    client_representation = {
        "clientId": "next-client",
        "rootUrl": "http://localhost:3000/",
        "redirectUris": ["http://localhost:3000/*"],
        "webOrigins": ["http://localhost:3000/*"],
        "protocol": "openid-connect",
        "clientAuthenticatorType": "client-secret",
        "publicClient": False,
        "directAccessGrantsEnabled": True,
        "enabled": True
    }

    clients = keycloak_admin.get_clients()
    next_client = [c for c in clients if c['clientId'] == "next-client"]
    if next_client:
        client_id = next_client[0]['id']
        keycloak_admin.update_client(client_id, payload=client_representation)
        print(f"Updated client: {client_representation['clientId']}")
    else:
        keycloak_admin.create_client(payload=client_representation)
        print(f"Created client: {client_representation['clientId']}")

    next_client = next((client for client in keycloak_admin.get_clients() if client['clientId'] == "next-client"), None)
    if next_client:
        client_secret = keycloak_admin.get_client_secret(next_client['id'])['value']
        print(f"Client Secret for 'next-client': {client_secret}")
    else:
        print("Error: Could not retrieve the 'next-client' details after creation.")

    roles_to_create = [
        {"name": "admin", "description": "Administrator Role"},
        {"name": "user", "description": "Regular User Role"}
    ]
    existing_roles = [role['name'] for role in keycloak_admin.get_realm_roles()]
    for role in roles_to_create:
        if role["name"] not in existing_roles:
            keycloak_admin.create_realm_role(payload=role)
            print(f"Created role: {role['name']}")

    admin_username = "project_admin"
    admin_users = keycloak_admin.get_users({"username": admin_username})
    if admin_users:
        print("Admin user already exists.")
    else:
        admin_user_representation = {
            "username": admin_username,
            "email": "admin@yourproject.com",
            "enabled": True,
            "firstName": "Project",
            "lastName": "Admin",
            "credentials": [{
                "type": "password",
                "value": "SecureAdminPassword123!",
                "temporary": False
            }]
        }
        keycloak_admin.create_user(payload=admin_user_representation)
        print(f"Created admin user: {admin_username}")


        admin_user = keycloak_admin.get_users({"username": admin_username})[0]
        admin_role = keycloak_admin.get_realm_role("admin")
        keycloak_admin.assign_realm_role(admin_user['id'], [admin_role])
        print(f"Assigned 'admin' role to {admin_username}.")

    try:
        realm_export = keycloak_admin.export_realm(realm_name)
        with open("solidarios-realm.json", "w") as realm_file:
            json.dump(realm_export, realm_file, indent=4)
        print(f"Exported realm configuration to 'solidarios-realm.json'.")
    except Exception as e:
        print(f"Failed to export realm configuration: {e}")

    print(f"Keycloak configuration for realm '{realm_name}' completed successfully.")

if __name__ == "__main__":
    configure_keycloak()
