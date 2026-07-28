# Security Cleanup Runbook

The repository previously contained public credentials and recovery material.
Deleting those files from the latest revision does not invalidate the
credentials and does not remove them from Git history.

## Required provider actions

Complete these before treating the repository as secure:

- Revoke the exposed Gmail SMTP/app password and inspect recent account access.
- Revoke or rotate the exposed Google OAuth client secret and review the OAuth
  client's redirect URIs and activity.
- Regenerate the exposed GitLab recovery codes and review active sessions,
  access tokens, deploy tokens, and SSH keys.
- Rotate any Mailtrap, Google API, or other keys that appeared in source or
  comments. Restrict replacement API keys by domain, API, and quota.
- Review the exposed SAST finding and confirm that the underlying issue is
  remediated without publishing the report.

Record completion in a private incident log. Do not add replacement secrets to
this repository.

## History cleanup gate

History rewriting is intentionally not automated. After provider rotation is
confirmed:

1. Create an offline backup of the repository.
2. Notify any collaborators that branches and tags will be rewritten.
3. Use `git filter-repo` to remove the affected paths and sensitive strings
   from every branch and tag.
4. Scan the rewritten repository with Gitleaks, including all reachable
   history.
5. Force-push the sanitized branches and tags.
6. Delete or rebuild stale forks, clones, releases, caches, and Pages artifacts
   where possible.
7. Clone the repository into a new directory and repeat the scan.

Rotation must happen before history cleanup because historical copies and
external caches cannot be guaranteed to disappear.

## Prevention

- GitHub Actions runs a full-history Gitleaks scan on pushes and pull requests.
- `.gitignore` blocks common credential, recovery-code, and report filenames.
- Production deployment uploads only the generated `dist/` artifact.
- Secrets must live only in provider secret stores or GitHub encrypted secrets.
