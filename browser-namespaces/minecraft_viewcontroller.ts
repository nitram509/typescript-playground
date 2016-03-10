/// <reference path="minecraft_model" />
/// <reference path="jquery.d.ts" />

module minecraft {

  // ******************************************************
  // export the 'view' first, to provide it for later usage
  export module util {

    export class ValueHolder<ValueType> {

      // 'Array<T>' is an equivalent way of writing 'T[]'
      private listeners: Array<(oldValue: ValueType, newValue: ValueType) => void> = [];
      private value: ValueType;

      public constructor(value?: ValueType) {
        this.value = value;
      }

      public get(): ValueType {
        return this.value;
      }

      public set(newValue: ValueType): void {
        var oldValue = this.value;
        this.value = newValue;
        for (var i = 0; i < this.listeners.length; i++) {
          var listener = this.listeners[i];
          listener.call(this, oldValue, newValue);
        }
      }

      public addValueChangeListener(listener: (oldValue: ValueType, newValue: ValueType) => void) {
        if (listener && typeof listener == 'function')
          this.listeners.push(listener);
      }

    }

  }

  // ******************************************************
  // 'viewcontroller' now can import classes from 'view'
  export module viewcontroller {

    import Mob = minecraft.model.Mob;
    import MobTypeResolver = minecraft.model.MobTypeResolver;
    import ValueHolder = minecraft.util.ValueHolder;

    // Private helper class
    class ClipboardHelper {
      public static MOB_ATTENDEE_DATA: string = "mob-attendee-data";
    }

    // Extending the interface to introduce 'attackStrength' as an optional property
    // Hint: More a hack, than clean code ;-)
    interface MobWhichMayAggressive extends Mob {
      attackStrength?: number;
    }

    export class Attendees {

      private attendees: Mob[] = [];
      private listItemElements: Element[] = [];

      bindTo(listItemElements: Element[]) {
        this.listItemElements = [];
        for (var i = 0; listItemElements && i < listItemElements.length; i++) {
          var li = listItemElements[i];
          this.listItemElements.push(li);
        }
        this.synchronizeAttendeesWithList();
      }

      clear() {
        this.attendees = [];
        this.synchronizeAttendeesWithList();
      }

      add(mobs: Mob[]) {
        if (mobs && mobs.length > 0) {
          for (var i = 0; i < mobs.length; i++) {
            var mob = mobs[i];
            this.attendees.push(mob);
          }
        }
        this.synchronizeAttendeesWithList();
      }

      private synchronizeAttendeesWithList() {
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
      }

      private createDescriptionForAttendee(li: Element, attendee: MobWhichMayAggressive) {
        var $divDescr = $("<div>").addClass("description").appendTo(li);

        $("<div>").text("Name").append(
          $("<span>").text(attendee.name)
        ).appendTo($divDescr);

        $("<div>").text("Mob type").append(
          $("<span>").text(MobTypeResolver.toName(attendee.mobType))
        ).appendTo($divDescr);

        $("<div>").text("Health points").append(
          $("<span>").text(attendee.healthPoints)
        ).appendTo($divDescr);

        $("<div>").text("Attack strength").append(
          $("<span>").text(attendee.attackStrength)
        ).appendTo($divDescr);
      }

      private createImageForAttendee(li: Element, attendee: Mob): JQuery {
        var $divImage = $("<div>").addClass("image").appendTo(li);
        return $("<img>")
          .attr({src : attendee.imagePath})
          .css({opacity : 0})
          .appendTo($divImage);
      }

      private prepareDragableHandler(img, attendee: Mob) {
        // hack to access jQueryUI Draggable
        $(img)['draggable']({
          revert : false,
          helper : "clone",
          snap : false,
          start : (event, ui) => {
            // temporary save data
            $(ui.helper).data(ClipboardHelper.MOB_ATTENDEE_DATA, attendee);
          }
        });
      }

      private animateFadeIn(img) {
        // hack to access Velocity.JS animation engine
        $(img)['velocity']({opacity : 1}, {duration : 1000, easing : "spring", progress : this.opacityProgressFunction});
      }

      private opacityProgressFunction(elements, percentComplete, timeRemaining, timeStart) {
        $(elements).css({opacity : percentComplete});
      }
    }

    // ******************************************
    // ******************************************

    export class Opponents {

      public one: ValueHolder<Mob> = new ValueHolder<Mob>();
      public two: ValueHolder<Mob> = new ValueHolder<Mob>();
      public three: ValueHolder<Mob> = new ValueHolder<Mob>();
      public four: ValueHolder<Mob> = new ValueHolder<Mob>();

      private opponents: ValueHolder<Mob>[] = [this.one, this.two, this.three, this.four];
      private button: Element;

      public bindTo(listItemElements: Element[]) {
        var len = Math.min(listItemElements.length, this.opponents.length);
        for (var index = 0; listItemElements && index < len; index++) {
          var li = listItemElements[index];
          this.prepareDropableHandler(index, li);

          var opponent: ValueHolder<Mob> = this.opponents[index];
          this.bind(opponent, li);
        }
      }

      public bindToButton(button: Element) {
        this.button = button;

        function toggleButton(oldMob: Mob, newMob: Mob): void {
          var allThere: boolean = true;
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
      }

      private bind(opponent: ValueHolder<Mob>, li: Element) {
        opponent.addValueChangeListener((oldMob: Mob, newMob: Mob): void => {
          $(li).empty();
          if (newMob) {
            $("<img>").attr({src : newMob.imagePath}).appendTo(li);
          }
        });
      }

      private prepareDropableHandler(index: number, li: Element) {
        $(li)['droppable']({
          hoverClass : "ui-state-droppable",
          drop : (event, ui) => {
            // fetch temporary data
            var attendee: Mob = $(ui.helper).data("mob-attendee-data");
            // delete data
            $(ui.helper).data(ClipboardHelper.MOB_ATTENDEE_DATA, null);

            this.opponents[index].set(attendee);
            return true;
          }
        });
      }

    }

  }


}