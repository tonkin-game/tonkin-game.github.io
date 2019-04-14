[ "$UID" -eq 0 ] || exec sudo bash "$0" "$@"
exec /opt/lampp/manager-linux-x64.run
