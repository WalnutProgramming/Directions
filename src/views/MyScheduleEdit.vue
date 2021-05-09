<template>
  <div>
    <div style="padding-left: 1vw">
      <div
        style="display: flex; flex-direction: row; justify-content: flex-start"
      >
        <div v-if="!$route.query.new">
          <CustomButton
            class="save"
            :type-submit="false"
            style="font-size: 14px; margin-right: 5vw"
            button-style="padding: 12px 20px;"
            @click="cancel"
          >
            &laquo; Cancel
          </CustomButton>
        </div>
        <div>
          <CustomButton class="save" style="font-size: 14px" @click="save">
            Save
          </CustomButton>
        </div>
      </div>
      <p v-if="$route.query.new" class="p">
        You don't seem to have an existing schedule. Create a new one!
      </p>
      <p class="p">
        Hold and drag to reorder classes. Press "Save" when you're finished
        editing.
      </p>
      <p class="p">
        Your schedule will be stored in your browser <b>on this device only</b>.
        If you're in private/incognito mode, your schedule will not be saved.
      </p>
      <form id="scheduleForm">
        <SlickList
          v-model:list="rooms"
          class="list"
          lock-axis="y"
          :press-delay="50"
          style="border: none"
        >
          <SlickItem
            v-for="(room, index) in rooms"
            :key="room.originalIndex"
            class="list-item"
            style="
              border-radius: 15px;
              height: 3rem;
              display: flex;
              align-items: center;
            "
            :index="index"
            :item="room"
          >
            <span
              style="
                width: 3em;
                font-size: 25px;
                color: var(--less-important-text-color);
              "
            >
              ☰&nbsp;&nbsp;<span style="">{{ index + 1 }}.&nbsp;&nbsp;</span>
            </span>
            <MinusButton
              type="button"
              class="smallerButton"
              style="font-size: 20px; margin-right: 10px"
              @click="removeIndex(index)"
            >
              —
            </MinusButton>
            <RoomInput
              v-model="room.value"
              :name="`room-${room.originalIndex}`"
              class="my-input"
              style="max-width: 40vw; transition: none; font-size: 1.25rem"
            />
          </SlickItem>
          <div class="list-item" style="border-radius: 15px; border: none">
            <PlusButton
              type="button"
              class="smallerButton"
              style="font-size: 25px"
              @click="newRoom"
            >
              <b>+</b>
            </PlusButton>
          </div>
        </SlickList>
      </form>
    </div>

    <teleport to="head">
      <title>Walnut.Direct - My Schedule - Edit</title>
      <meta
        name="description"
        content="Input your schedule into Walnut.Direct so we can give you directions between your classes in Walnut Hills High School."
      />
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { SlickList, SlickItem } from "vue-slicksort";
import RoomInput from "@/components/RoomInput.vue";
import CustomButton from "@/components/buttons/CustomButton.vue";
import MinusButton from "@/components/buttons/MinusButton.vue";
import PlusButton from "@/components/buttons/PlusButton.vue";
import { walnutNonAccessible } from "@/walnut";

interface Room {
  value: string;
  originalIndex: number;
}

function getDefaultRooms() {
  const ret: Room[] = [];
  for (let i = 0; i < 7; i += 1) {
    ret.push({ value: "", originalIndex: i });
  }
  return ret;
}

function getStoredRooms() {
  return localStorage.getItem("myschedule");
}

function roomsListsEqual(a: Room[], b: Room[]) {
  const aValues = a.map(({ value }) => value).filter((v) => v !== "");
  const bValues = b.map(({ value }) => value).filter((v) => v !== "");
  if (aValues.length !== bValues.length) {
    return false;
  }
  for (let i = 0; i < aValues.length; i += 1) {
    if (aValues[i] !== bValues[i]) return false;
  }
  return true;
}

export default defineComponent({
  compatConfig: { MODE: 3, INSTANCE_EVENT_HOOKS: true },
  components: {
    RoomInput,
    CustomButton,
    SlickList: SlickList as any,
    SlickItem: SlickItem as any,
    MinusButton,
    PlusButton,
  },
  beforeRouteLeave(to: any, from: any, next: any) {
    const stored = getStoredRooms();
    if (
      (stored == null && roomsListsEqual(this.rooms, getDefaultRooms())) ||
      (stored != null && roomsListsEqual(this.rooms, JSON.parse(stored).rooms))
    ) {
      next();
    } else {
      // eslint-disable-next-line no-alert
      const answer = window.confirm(
        "Are you sure you want to leave? Your changes to your schedule will NOT be saved."
      );
      if (answer) {
        next();
      } else {
        next(false);
      }
    }
  },
  data() {
    const stored = getStoredRooms();
    let rooms: Room[];
    if (stored != null) {
      rooms = JSON.parse(stored).rooms;
    } else {
      rooms = getDefaultRooms();
    }
    return { rooms };
  },
  methods: {
    newRoom() {
      this.rooms.push({ value: "", originalIndex: this.rooms.length });
    },
    save() {
      Array.from(document.getElementsByClassName("my-input")).forEach(
        (theInput) => {
          const inp = theInput as HTMLInputElement;
          if (
            inp.value === "" ||
            walnutNonAccessible.isValidRoomName(inp.value)
          ) {
            inp.setCustomValidity("");
          } else {
            inp.setCustomValidity(
              `I can't find a room with the name ${inp.value}`
            );
          }
        }
      );
      const form = document.getElementById("scheduleForm") as HTMLFormElement;
      if ("reportValidity" in form /* browser support */) form.reportValidity();
      if (
        this.rooms.every(
          ({ value }: { value: string }) =>
            value.trim() === "" || walnutNonAccessible.isValidRoomName(value)
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
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid #efefef;
  border-radius: 3;
}

.list-item {
  display: flex;
  /* align-items: center; */
  /* width: 100%; */
  padding: 10px;
  background-color: var(--slick-background-color);
  border-bottom: 5px solid var(--background-color);
  box-sizing: border-box;
  user-select: none;

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
