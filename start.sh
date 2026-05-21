#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COMPOSE_FILE="${ROOT_DIR}/infra/docker-compose.dev.yml"

ENV_EXAMPLES=(
  "apps/web/.env.example:apps/web/.env"
  "apps/ia/api/.env.example:apps/ia/api/.env"
  "services/postgres/.env.example:services/postgres/.env"
  "services/redis/.env.example:services/redis/.env"
)

log() { printf '→ %s\n' "$*"; }
die() { printf '✗ %s\n' "$*" >&2; exit 1; }

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || die "Commande manquante : $1"
}

ensure_env_files() {
  for pair in "${ENV_EXAMPLES[@]}"; do
    local src="${ROOT_DIR}/${pair%%:*}"
    local dst="${ROOT_DIR}/${pair##*:}"
    if [[ ! -f "$dst" && -f "$src" ]]; then
      cp "$src" "$dst"
      log "Créé $(basename "$dst") depuis $(basename "$src")"
    fi
  done
}

usage() {
  cat <<'EOF'
Usage: ./start.sh [commande] [options]

Commandes:
  up        Démarre la stack Docker (défaut)
  down      Arrête et supprime les conteneurs
  logs      Affiche les logs (docker compose logs -f)
  local     Postgres + Redis en Docker, apps en pnpm dev sur l'hôte

Options (pour up / local):
  -d        Mode détaché (arrière-plan)

Exemples:
  ./start.sh
  ./start.sh up -d
  ./start.sh down
  ./start.sh local
EOF
}

cmd_up() {
  require_cmd docker
  docker compose version >/dev/null 2>&1 || die "docker compose introuvable"
  ensure_env_files
  log "Démarrage Docker (web: http://localhost:3001, ia: http://localhost:3002)"
  docker compose -f "$COMPOSE_FILE" up --build "$@"
}

cmd_down() {
  require_cmd docker
  docker compose -f "$COMPOSE_FILE" down
}

cmd_logs() {
  require_cmd docker
  docker compose -f "$COMPOSE_FILE" logs -f "${@:2}"
}

cmd_local() {
  require_cmd docker
  require_cmd pnpm
  ensure_env_files
  log "Infra Docker (postgres + redis)…"
  docker compose -f "$COMPOSE_FILE" up -d entodex-postgres-dev entodex-redis-dev
  log "Installation des dépendances…"
  (cd "$ROOT_DIR" && pnpm install)
  log "Apps en local via turbo…"
  (cd "$ROOT_DIR" && pnpm --filter @entodex/mobile dev)
}

main() {
  local cmd="${1:-up}"
  shift || true

  case "$cmd" in
    up)
      cmd_up "$@"
      ;;
    down)
      cmd_down
      ;;
    logs)
      cmd_logs "$@"
      ;;
    local)
      cmd_local "$@"
      ;;
    -h|--help|help)
      usage
      ;;
    *)
      die "Commande inconnue : $cmd (./start.sh --help)"
      ;;
  esac
}

main "$@"