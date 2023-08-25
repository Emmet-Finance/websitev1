import React from 'react';

function HashLink({
    explorer,
    extension,
    hash,
    linkText
}) {

    return (
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={`${explorer}${extension}${hash}`}
        >
            {linkText}
        </a>)

}

export default HashLink;