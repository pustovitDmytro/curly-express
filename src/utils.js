export function build({ method = 'GET', url, headers = {}, json, urlencoded, form, user }) {
    const command = [ 'curl' ];

    command.push('-X', method);
    Object.entries(headers).forEach(([ key, value ]) => {
        command.push('-H', `'${key}: ${value}'`);
    });

    // if (url.username) command.push('--user', `${url.username}:${url.password}`);
    if (user) command.push('--user', `${user.name}:${user.pass}`);

    if (json) {
        command.push('-d', `'${JSON.stringify(json)}'`);
    }

    if (urlencoded) {
        Object.entries(urlencoded).forEach(([ key, value ]) => {
            command.push('--data-urlencode', `'${key}=${value}'`);
        });
    }

    if (form) {
        form.forEach(({ key, value }) => {
            command.push('-F', `'${key}=${value}'`);
        });
    }

    command.push(url.href);

    return command.join(' ');
}
