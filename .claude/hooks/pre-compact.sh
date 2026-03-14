#!/bin/bash
# Pre-compaction hook: Remind Claude to update documentation before compacting
PROJECT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"

echo "=== PRE-COMPACTION REMINDER ==="
echo "Before compaction proceeds, ensure the following files are up to date:"
echo "  - CLAUDE.md (project context and decisions)"
echo "  - docs/design-decisions.md (all design decisions)"
echo "  - docs/*.md (any other documentation)"
echo "  - Memory MEMORY.md (key learnings and state)"
echo ""
echo "Current docs in project:"
ls -1 "$PROJECT_DIR/docs/" 2>/dev/null || echo "  No docs folder found"
echo "================================"

exit 0
