# Contributing guidelines

Please take some time and review the contributing guidelines below. These should
be followed when working with any projects in Shout It ecosystem.

## Terminology

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL
NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED",  "MAY", and
"OPTIONAL" in this document are to be interpreted as described in
[RFC 2119][5].

The term `merge request` and `pull request` are used interchangeably
for the purposes of this document.

## GitHub flow

We practice [GitHub Flow][1] to maintain a consistent workflow across all
projects.

1. Clone the project
2. Create a feature branch based on the main branch
3. Write and push your code
4. Test, test, test
5. Submit a merge request for your branch into the main branch

## Creating issues

All code changes SHOULD start with an issue. When creating a new issue please
use one of the predefined templates that best fits your request, if one isn't
available please reach out to a project maintainer to request one. Please make
sure to be as detailed as possible when filing an issue, so we don't have to
track you down later for more information. When possible you should practice
[user stories and acceptance criteria][2] to set clear requirements.

Remember, even if you aren't contributing code, opening feature requests,
reporting bugs, or even just discussing ideas are all ways to make this
project better.

## Commit messages

We follow the [Conventional Commit Specification][3] with a few
additional requirements.

```text
<type>(<scope>): <subject>

<optional body>

<optional footer>
```

**Additional Requirements:**

- Breaking changes must include a `!` in the subject and `BREAKING CHANGE:` in
  the footer as described by [the specification][4]
- The scope property MUST be set to the package being worked on, or left blank 
  when working outside of packages

## Merge requests

Every merge request should start with an issue, if you don't have an issue, you
can't do much. When you open a merge request make sure to use an issue template
when available.

If your merge request is created before it's complete, please make sure to flag
it as a draft by putting `Draft:` at the start of the title.

Once your code is complete, the pipelines are passing, and it's ready for
review, you should make sure to indicate this. You can do this by removing the
`Draft:` flag if set, changing the label to `Workflow::Needs Review` and
assigning a reviewer.

## Code style

When working within our repositories you should do your best to ad-hear to our
code style guidelines. By following these guidelines we can create clean, easy
to maintain projects.

- [JavaScript Style Guide][6]
- [Markdown Style Guide][7]

[1]: https://docs.github.com/en/get-started/quickstart/github-flow#following-github-flow
[2]: https://www.softwaretestinghelp.com/user-story-acceptance-criteria/
[3]: https://www.conventionalcommits.org/en/v1.0.0/
[4]:
https://www.conventionalcommits.org/en/v1.0.0/#commit-message-with-both--and-breaking-change-footer
[5]: https://datatracker.ietf.org/doc/html/rfc2119
[6]: https://github.com/airbnb/javascript/blob/master/README.md
[7]: https://google.github.io/styleguide/docguide/style.html
