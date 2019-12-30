<template>
  <div style="padding: 1vw;">
    <div>
      <CustomButton
        class="save"
        type="button"
        style="font-size:14px"
        button-style="padding: 12px 20px"
        @customclick="cancel"
      >
        &laquo; Cancel
      </CustomButton>
    </div>
    <p v-if="$route.query.new" class="p">
      You don't seem to have an existing schedule. Create a new one!
    </p>
    <p class="p">
      Hold and drag to reorder classes.
    </p>
    <p class="p">
      Your schedule will be stored in your browser <b>on this device only</b>.
      If you're in private/incognito mode, your schedule will not be saved.
    </p>
    <form id="scheduleForm">
      <SlickList
        v-model="rooms"
        class="list"
        lock-axis="y"
        :press-delay="50"
        style="border: none;"
      >
        <SlickItem
          v-for="(room, index) in rooms"
          :key="room.originalIndex"
          class="list-item"
          style="background-color: #fafafa; border-radius: 15px; border: none; height: 9vh;"
          :index="index"
          :item="room"
        >
          <span style="width: 3em; font-size: 25px; color: #6f6f6f">
            ☰&nbsp;&nbsp;<span style="">{{ index + 1 }}.&nbsp;&nbsp;</span>
          </span>
          <MinusButton
            type="button"
            class="smallerButton"
            style="font-size: 20px; margin-right: 10px; margin-top: 0.75vh;"
            @customclick="removeIndex(index)"
          >
            —
          </MinusButton>
          <RoomInput
            v-model="room.value"
            :name="`room-${room.originalIndex}`"
            class="my-input"
            style="max-width: 40vw"
          />
        </SlickItem>
        <div
          class="list-item"
          style="background-color: #ffffff; border-radius: 15px; border: none;"
        >
          <PlusButton
            type="button"
            class="smallerButton"
            style="font-size: 25px;"
            @customclick="newRoom"
          >
            <b>+</b>
          </PlusButton>
        </div>
      </SlickList>
      <div>
        <CustomButton class="save" @customclick="save">Save</CustomButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { SlickList, SlickItem } from "vue-slicksort";
import RoomInput from "../components/RoomInput.vue";
import CustomButton from "../components/CustomButton.vue";
import MinusButton from "../components/MinusButton.vue";
import PlusButton from "../components/PlusButton.vue";
import walnut from "../walnut";

interface Room {
  value: string;
  originalIndex: number;
}

export default Vue.extend({
  components: {
    RoomInput,
    CustomButton,
    SlickList: SlickList as any,
    SlickItem: SlickItem as any,
    MinusButton,
    PlusButton,
  },
  data() {
    const stored = localStorage.getItem("myschedule");
    let rooms: Room[];
    if (stored != null) {
      rooms = JSON.parse(stored).rooms;
    } else {
      rooms = [];
      for (let i = 0; i < 7; i += 1) {
        rooms.push({ value: "", originalIndex: i });
      }
    }
    return { rooms };
  },
  methods: {
    newRoom() {
      this.rooms.push({ value: "", originalIndex: this.rooms.length });
    },
    save() {
      Array.from(document.getElementsByClassName("my-input")).forEach(
        theInput => {
          const inp = theInput as HTMLInputElement;
          if (inp.value === "" || walnut.isValidRoomName(inp.value)) {
            inp.setCustomValidity("");
          } else {
            inp.setCustomValidity(
              `I can't find a room with the name ${inp.value}`
            );
          }
        }
      );
      (document.getElementById(
        "scheduleForm"
      ) as HTMLFormElement).reportValidity();
      if (
        this.rooms.every(
          ({ value }) => value.trim() === "" || walnut.isValidRoomName(value)
        )
      ) {
        /* */
        localStorage.setItem(
          "myschedule",
          JSON.stringify({ rooms: this.rooms })
        );
        this.$router.push("/myschedule");
      }
    },
    cancel() {
      this.$router.push("/myschedule");
    },
    removeIndex(index: number) {
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

  user-select: none;
}

.my-input {
  margin-bottom: 0;
}

.save {
  margin-top: 0.5em;
}

.p {
  font-size: 16px;
}

.smallerButton {
  margin-top: -0.2em;
  margin-bottom: -0.2em;
  font-size: 0.8em;
}

#scheduleForm {
  font-size: 18px;
}
</style>
