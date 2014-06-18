var minecraft;
(function (minecraft) {
    (function (model) {
        (function (MobType) {
            MobType[MobType["PASSIVE"] = 1] = "PASSIVE";
            MobType[MobType["NEUTRAL"] = 2] = "NEUTRAL";
            MobType[MobType["HOSTILE"] = 3] = "HOSTILE";
        })(model.MobType || (model.MobType = {}));
        var MobType = model.MobType;

        var MobTypeResolver = (function () {
            function MobTypeResolver() {
            }
            MobTypeResolver.toName = function (mobType) {
                switch (mobType) {
                    case 1 /* PASSIVE */:
                        return "Passive";
                    case 2 /* NEUTRAL */:
                        return "Neutral";
                    case 3 /* HOSTILE */:
                        return "Hostile";
                }
                return "Unknown";
            };
            return MobTypeResolver;
        })();
        model.MobTypeResolver = MobTypeResolver;
    })(minecraft.model || (minecraft.model = {}));
    var model = minecraft.model;
})(minecraft || (minecraft = {}));
//# sourceMappingURL=minecraft_model.js.map
