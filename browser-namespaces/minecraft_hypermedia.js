var minecraft;
(function (minecraft) {
    (function (hypermedia) {
        var HyperMediaDocument = (function () {
            function HyperMediaDocument(data) {
                this.links = {};
                if (!data)
                    return;
                if (data._links) {
                    this.links = data._links;
                    delete data._links;
                }
                if (data._embedded) {
                    this.embedded = data._embedded;
                    delete data._embedded;
                }
                this.data = data;
            }
            HyperMediaDocument.prototype.getData = function () {
                return this.data;
            };

            HyperMediaDocument.prototype.getEmbedded = function () {
                return this.embedded;
            };

            HyperMediaDocument.prototype.getSelfLink = function () {
                return this.getLink("self");
            };

            HyperMediaDocument.prototype.getLink = function (relation) {
                if (this.links[relation]) {
                    return this.links[relation].href;
                }
                return null;
            };
            return HyperMediaDocument;
        })();
        hypermedia.HyperMediaDocument = HyperMediaDocument;
    })(minecraft.hypermedia || (minecraft.hypermedia = {}));
    var hypermedia = minecraft.hypermedia;
})(minecraft || (minecraft = {}));
//# sourceMappingURL=minecraft_hypermedia.js.map
