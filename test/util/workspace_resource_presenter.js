/**
* Copyright (C) 2015-2018 Starbreeze AB All Rights Reserved.
*/

'use strict';

module.exports = (name, guid, statuses = [], subscriptions = []) => ({
    guid,
    name: name,
    description: 'This is your first workspace cloned from DLC_1 branch !',
    version: '2.0.0',
    pushed_at: '2011-01-26T19:01:12Z',
    created_at: '2011-01-26T19:01:12Z',
    updated_at: '2011-01-26T19:14:43Z',
    type: 'application/vnd.bilrost.workspace+json',
    tags: ['Hello', 'World'],
    stage: [],
    subscriptions,
    statuses,
    project: {
        full_name: 'fl4re/open_bilrost_test_project',
        host: 's3'
    }
});
