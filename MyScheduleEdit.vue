<template>
  <div>
    <p v-if="$route.query.new">
      You don't seem to have an existing schedule. Create a new one!
    </p>
    <p>
      Hold and drag to reorder classes.
    </p>
    <p>
      Your schedule will be stored in your browser <b>on this device only</b>.
      If you're in private/incognito mode, your schedule will not be saved.
    </p>
    <form id="scheduleForm">
      <SlickList class="list" lockAxis="y" v-model="rooms" :pressDelay="50">
        <SlickItem
          class="list-item"
          v-for="(room, index) in rooms"
          :key="room.originalIndex"
          :index="index"
          :item="room"
        >
          <span style="width: 4em">
            ☰&nbsp;&nbsp;<span style="">{{ index + 1 }}.&nbsp;&nbsp;</span>
          </span>
          <CustomButton @customclick="removeIndex(index)" class="smallerButton"
            >-</CustomButton
          >
          <RoomInput
            :name="`room-${room.originalIndex}`"
            class="my-input"
            style="background-color: #f2f7f4; max-width: 40vw"
            v-model="room.value"
          />
        </SlickItem>
        <div class="list-item">
          <CustomButton @customclick="newRoom" class="smallerButton">
            +
          </CustomButton>
        </div>
      </SlickList>
    </form>
    <div>
      <CustomButton @customclick="save" class="save">Save</CustomButton>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import RoomInput from "./RoomInput.vue";
import CustomButton from "./CustomButton.vue";
import { SlickList, SlickItem } from "vue-slicksort";
import walnut from "./walnut";

export default Vue.extend({
  components: { RoomInput, CustomButton, SlickList, SlickItem },
  data() {
    const stored = localStorage.getItem("myschedule");
    let rooms;
    if (stored != null) {
      rooms = JSON.parse(stored).rooms;
    } else {
      rooms = [];
      for (let i = 0; i < 7; i++) rooms.push({ value: "", originalIndex: i });
    }
    return { rooms };
  },
  methods: {
    newRoom() {
      this.rooms.push({ value: "", originalIndex: this.rooms.length });
    },
    save() {
      Array.from(document.getElementsByClassName("my-input")).forEach(
        (inp, index) => {
          if (inp.value === "" || walnut.isValidRoomName(inp.value)) {
            inp.setCustomValidity("");
          } else {
            inp.setCustomValidity(
              `I can't find a room with the name ${inp.value}`
            );
          }
        }
      );
      document.getElementById("scheduleForm").reportValidity();
      if (
        this.rooms.every(
          ({ value }) => value.trim() === "" || walnut.isValidRoomName(value)
        )
      ) {
        localStorage.setItem(
          "myschedule",
          JSON.stringify({ rooms: this.rooms })
        );
        this.$router.push("/myschedule");
      }
    },
    removeIndex(index) {
      this.rooms.splice(index, 1);
    },
  },
});
</script>

<style scoped>
.list {
  /* width: 80%; */
  /* max-height: 50vh; */
  /* max-width: 500px; */
  margin: 0 auto;
  padding: 0;
  overflow: auto;
  background-color: #f3f3f3;
  border: 1px solid #efefef;
  border-radius: 3;
}

.list-item {
  display: flex;
  /* align-items: center; */
  /* width: 100%; */
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #efefef;
  box-sizing: border-box;
  user-select: none;

  color: #333;
  font-weight: 400;

  -webkit-user-select: none; /* Safari 3.1+ */
  -moz-user-select: none; /* Firefox 2+ */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* Standard syntax */
}

.my-input {
  margin-bottom: 0;
}

.save {
  margin-top: 0.5em;
}

p {
  font-size: 16px;
}

.smallerButton {
  margin-top: -0.2em;
  margin-bottom: -0.2em;
  font-size: 0.8em;
}
</style>
