/// <reference path="minecraft_model" />
/// <reference path="jquery.d" />
var minecraft;
(function (minecraft) {
    // ******************************************************
    // export the 'view' first, to provide it for later usage
    (function (util) {
        var ValueHolder = (function () {
            function ValueHolder(value) {
                // 'Array<T>' is an equivalent way of writing 'T[]'
                this.listeners = [];
                this.value = value;
            }
            ValueHolder.prototype.get = function () {
                return this.value;
            };

            ValueHolder.prototype.set = function (newValue) {
                var oldValue = this.value;
                this.value = newValue;
                for (var i = 0; i < this.listeners.length; i++) {
                    var listener = this.listeners[i];
                    listener.call(this, oldValue, newValue);
                }
            };

            ValueHolder.prototype.addValueChangeListener = function (listener) {
                if (listener && typeof listener == 'function')
                    this.listeners.push(listener);
            };
            return ValueHolder;
        })();
        util.ValueHolder = ValueHolder;
    })(minecraft.util || (minecraft.util = {}));
    var util = minecraft.util;

    // ******************************************************
    // 'viewcontroller' now can import classes from 'view'
    (function (viewcontroller) {
        var MobTypeResolver = minecraft.model.MobTypeResolver;
        var ValueHolder = minecraft.util.ValueHolder;

        // Private helper class
        var ClipboardHelper = (function () {
            function ClipboardHelper() {
            }
            ClipboardHelper.MOB_ATTENDEE_DATA = "mob-attendee-data";
            return ClipboardHelper;
        })();

        

        var Attendees = (function () {
            function Attendees() {
                this.attendees = [];
                this.listItemElements = [];
            }
            Attendees.prototype.bindTo = function (listItemElements) {
                this.listItemElements = [];
                for (var i = 0; listItemElements && i < listItemElements.length; i++) {
                    var li = listItemElements[i];
                    this.listItemElements.push(li);
                }
                this.synchronizeAttendeesWithList();
            };

            Attendees.prototype.clear = function () {
                this.attendees = [];
                this.synchronizeAttendeesWithList();
            };

            Attendees.prototype.add = function (mobs) {
                if (mobs && mobs.length > 0) {
                    for (var i = 0; i < mobs.length; i++) {
                        var mob = mobs[i];
                        this.attendees.push(mob);
                    }
                }
                this.synchronizeAttendeesWithList();
            };

            Attendees.prototype.synchronizeAttendeesWithList = function () {
                for (var i = 0; i < this.listItemElements.length; i++) {
                    var li = this.listItemElements[i];
                    $(li).empty();
                    if (i < this.attendees.length) {
                        var attendee = this.attendees[i];
                        this.createDescriptionForAttendee(li, attendee);
                        var img = this.createImageForAttendee(li, attendee);
                        this.prepareDragableHandler(img, attendee);
                        this.animateFadeIn(img);
                    }
                }
            };

            Attendees.prototype.createDescriptionForAttendee = function (li, attendee) {
                var $divDescr = $("<div>").addClass("description").appendTo(li);

                $("<div>").text("Name").append($("<span>").text(attendee.name)).appendTo($divDescr);

                $("<div>").text("Mob type").append($("<span>").text(MobTypeResolver.toName(attendee.mobType))).appendTo($divDescr);

                $("<div>").text("Health points").append($("<span>").text(attendee.healthPoints)).appendTo($divDescr);

                $("<div>").text("Attack strength").append($("<span>").text(attendee.attackStrength)).appendTo($divDescr);
            };

            Attendees.prototype.createImageForAttendee = function (li, attendee) {
                var $divImage = $("<div>").addClass("image").appendTo(li);
                return $("<img>").attr({ src: attendee.imagePath }).css({ opacity: 0 }).appendTo($divImage);
            };

            Attendees.prototype.prepareDragableHandler = function (img, attendee) {
                // hack to access jQueryUI Draggable
                $(img)['draggable']({
                    revert: false,
                    helper: "clone",
                    snap: false,
                    start: function (event, ui) {
                        // temporary save data
                        $(ui.helper).data(ClipboardHelper.MOB_ATTENDEE_DATA, attendee);
                    }
                });
            };

            Attendees.prototype.animateFadeIn = function (img) {
                // hack to access Velocity.JS animation engine
                $(img)['velocity']({ opacity: 1 }, { duration: 1000, easing: "spring", progress: this.opacityProgressFunction });
            };

            Attendees.prototype.opacityProgressFunction = function (elements, percentComplete, timeRemaining, timeStart) {
                $(elements).css({ opacity: percentComplete });
            };
            return Attendees;
        })();
        viewcontroller.Attendees = Attendees;

        // ******************************************
        // ******************************************
        var Opponents = (function () {
            function Opponents() {
                this.one = new ValueHolder();
                this.two = new ValueHolder();
                this.three = new ValueHolder();
                this.four = new ValueHolder();
                this.opponents = [this.one, this.two, this.three, this.four];
            }
            Opponents.prototype.bindTo = function (listItemElements) {
                var len = Math.min(listItemElements.length, this.opponents.length);
                for (var index = 0; listItemElements && index < len; index++) {
                    var li = listItemElements[index];
                    this.prepareDropableHandler(index, li);

                    var opponent = this.opponents[index];
                    this.bind(opponent, li);
                }
            };

            Opponents.prototype.bindToButton = function (button) {
                this.button = button;

                function toggleButton(oldMob, newMob) {
                    var allThere = true;
                    for (var i = 0; i < this.opponents.length; i++) {
                        var o = this.opponents[i];
                        allThere = allThere && o.get();
                    }
                    if (allThere) {
                        $(button).removeAttr('disabled');
                    } else {
                        $(button).attr('disabled', 'disabled');
                    }
                }

                if (button) {
                    this.one.addValueChangeListener(toggleButton.bind(this));
                    this.two.addValueChangeListener(toggleButton.bind(this));
                    this.three.addValueChangeListener(toggleButton.bind(this));
                    this.four.addValueChangeListener(toggleButton.bind(this));
                }

                toggleButton.call(this, null, null);
            };

            Opponents.prototype.bind = function (opponent, li) {
                opponent.addValueChangeListener(function (oldMob, newMob) {
                    $(li).empty();
                    if (newMob) {
                        $("<img>").attr({ src: newMob.imagePath }).appendTo(li);
                    }
                });
            };

            Opponents.prototype.prepareDropableHandler = function (index, li) {
                var _this = this;
                $(li)['droppable']({
                    hoverClass: "ui-state-droppable",
                    drop: function (event, ui) {
                        // fetch temporary data
                        var attendee = $(ui.helper).data("mob-attendee-data");

                        // delete data
                        $(ui.helper).data(ClipboardHelper.MOB_ATTENDEE_DATA, null);

                        _this.opponents[index].set(attendee);
                        return true;
                    }
                });
            };
            return Opponents;
        })();
        viewcontroller.Opponents = Opponents;
    })(minecraft.viewcontroller || (minecraft.viewcontroller = {}));
    var viewcontroller = minecraft.viewcontroller;
})(minecraft || (minecraft = {}));
//# sourceMappingURL=minecraft_viewcontroller.js.map
