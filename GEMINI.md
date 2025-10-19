# Automating Changelog Entries

This document outlines how to set up a Git hook to automatically add an entry to `CHANGELOG.md` every time you make a commit. This helps maintain a clear and consistent history of changes.

We will use a `commit-msg` Git hook. This script runs after you write a commit message but before the commit is created. It allows us to read your commit message and prepend it to the changelog.

## Recommended Commit Message Format

To make the changelog meaningful, it's best to follow a structured commit message format, like Conventional Commits. This helps categorize changes automatically. Here are some examples:

- `feat: Add user authentication` (New feature)
- `fix: Correct inventory calculation bug` (Bug fix)
- `refactor: Improve state management in Checklist component` (Code refactoring)
- `docs: Update README with deployment instructions` (Documentation changes)

The script below is designed to work with this format.

## Setup Instructions

Follow these steps in your terminal from the root of the project directory.

1.  **Navigate to your Git hooks directory:**
    ```sh
    cd .git/hooks
    ```

2.  **Create the `commit-msg` hook file:**
    ```sh
    touch commit-msg
    ```

3.  **Make the file executable:**
    ```sh
    chmod +x commit-msg
    ```

4.  **Add the script:**
    Open the `commit-msg` file in a text editor and paste the following script into it:

    ```sh
    #!/bin/sh

    COMMIT_MSG_FILE=$1
    FIRST_LINE=$(head -n1 "$COMMIT_MSG_FILE")

    # Don't add merge commits or other non-feature/fix/refactor commits to the changelog
    if echo "$FIRST_LINE" | grep -q -E "^(Merge|Revert|chore:|ci:|docs:|style:|test:)"; then
        exit 0
    fi

    # Prepend the formatted entry to CHANGELOG.md
    (echo "- $FIRST_LINE"; cat CHANGELOG.md) > CHANGELOG.md.tmp && mv CHANGELOG.md.tmp CHANGELOG.md
    ```

Now, every time you run `git commit`, the first line of your commit message will be automatically added to the top of the `CHANGELOG.md` file under the `[Unreleased]` section.