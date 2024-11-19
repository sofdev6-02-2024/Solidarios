

cd "$(dirname "$0")"

PYTHON_VERSION=$(python3 --version | cut -d' ' -f2)
PYTHON_MAJOR=$(echo $PYTHON_VERSION | cut -d'.' -f1)
PYTHON_MINOR=$(echo $PYTHON_VERSION | cut -d'.' -f2)

if [ $PYTHON_MAJOR -lt 3 ] || ([ $PYTHON_MAJOR -eq 3 ] && [ $PYTHON_MINOR -lt 8 ]); then
    echo "Error: Python 3.8+ is required. Current version: $PYTHON_VERSION"
    exit 1
fi

if [ ! -f solidarios-realm.json ]; then
    cat > solidarios-realm.json << EOL
{
    "realm": "solidarios-realm",
    "enabled": true,
    "registrationAllowed": true,
    "loginTheme": "keycloak",
    "emailTheme": "keycloak"
}
EOL
fi

if [ ! -d "venv" ]; then

    python3 -m venv venv
fi

source venv/bin/activate

pip install --upgrade pip

pip install -r requirements.txt

max_attempts=30
attempt=0
while ! nc -z localhost 8080 && [ $attempt -lt $max_attempts ]; do
    echo "Waiting for Keycloak to start... (attempt $((attempt+1))/$max_attempts)"
    sleep 2
    ((attempt++))
done

if [ $attempt -eq $max_attempts ]; then
    echo "Error: Keycloak did not start in time"
    deactivate
    exit 1
fi

python keycloak_setup.py

deactivate

echo "Keycloak configuration completed successfully!"