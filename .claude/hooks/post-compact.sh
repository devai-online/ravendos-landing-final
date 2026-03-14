#!/bin/bash
# Post-compaction hook: Restore project context by reading all documentation
PROJECT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"

echo "=== POST-COMPACTION CONTEXT RESTORE ==="
echo ""

# Read CLAUDE.md
if [ -f "$PROJECT_DIR/CLAUDE.md" ]; then
  echo "--- CLAUDE.md ---"
  cat "$PROJECT_DIR/CLAUDE.md"
  echo ""
  echo "--- END CLAUDE.md ---"
  echo ""
fi

# Read all docs
if [ -d "$PROJECT_DIR/docs" ]; then
  for doc in "$PROJECT_DIR/docs/"*.md; do
    if [ -f "$doc" ]; then
      echo "--- $(basename "$doc") ---"
      cat "$doc"
      echo ""
      echo "--- END $(basename "$doc") ---"
      echo ""
    fi
  done
fi

echo "=== CONTEXT RESTORE COMPLETE ==="
echo "Resume the design conversation from where we left off."
echo "Check the pending decisions in docs/design-decisions.md."

exit 0
