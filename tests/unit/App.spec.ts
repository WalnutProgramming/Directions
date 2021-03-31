import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import App from "@/App.vue";
import router from "@/router";

const localVue = createLocalVue();
localVue.use(VueRouter);

beforeAll(() => {
  window.scrollTo = jest.fn();
});

describe("App", () => {
  it("gives correct directions from room 3104 to room 3113", async () => {
    const wrapper = mount(App, { router, localVue });

    expect(wrapper.html()).toContain("Where do you need to go?");

    wrapper.find("#fromRoom").setValue("3104");
    wrapper.find("#toRoom").setValue("3113");
    wrapper.find("button:not(.moon-button)").trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.find("p.direction-line:nth-child(1)").text())
      .toMatchInlineSnapshot(`
      "Note: Based on COVID precautions, when our directions tell
                you to turn left out of a classroom, you may instead need to turn
                right out of the classroom, then make a U-turn at the end of the
                hallway."
    `);
    expect(
      wrapper.find("p.direction-line:nth-child(2)").text()
    ).toMatchInlineSnapshot(`"Turn left out of room 3104"`);
    expect(
      wrapper.find("p.direction-line:nth-child(3)").text()
    ).toMatchInlineSnapshot(
      `"Continue, then turn right (after passing room 3105 on your right)"`
    );
    expect(
      wrapper.find("p.direction-line:nth-child(4)").text()
    ).toMatchInlineSnapshot(
      `"Continue, then turn left (after passing room 3111 on your right)"`
    );
  });
});
