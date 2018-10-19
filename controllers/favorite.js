/**
* Copyright (C) 2015-2018 Starbreeze AB All Rights Reserved.
*/

'use strict';

const Handler = require('../lib/handler');

const _workspace_metadata_presenter = require('../assetmanager/workspace_presenter').Workspace_metadata_presenter;

module.exports = function(server, context) {
    const favorite = context.favorite;
    const _workspace = require('../assetmanager/workspace')(context);

    server.post('/assetmanager/favorites', async (req, res, next) => {
        const handler = new Handler(req, res, next);
        const workspace_file_uri = req.body.file_uri;
        const workspace_name = req.body.name;
        try {
            const workspace = await _workspace.find_by_file_uri(workspace_file_uri);
            await workspace.check_overall_validation();
            await favorite.add({ name: workspace_name, file_uri: workspace.get_file_uri()});
            handler.sendJSON(_workspace_metadata_presenter.present(workspace), 200, 'workspace');
        } catch (workspace) {
            handler.handleError(workspace);
        }
    });

    server.del('/assetmanager/favorites/:identifier', async (req, res, next) => {
        const workspace_identifier = req.params.identifier;
        const handler = new Handler(req, res, next);
        try {
            await favorite.remove(workspace_identifier);
            handler.sendJSON('Ok', 200);
        } catch (workspace) {
            handler.handleError(workspace.error || workspace);
        }
    });

    server.post('/assetmanager/favorites/reset', async (req, res, next) => {
        const handler = new Handler(req, res, next);
        try {
            await favorite.flush();
            handler.sendJSON('Ok', 200);
        } catch (err) {
            handler.handleError(err);
        }
    });
};
