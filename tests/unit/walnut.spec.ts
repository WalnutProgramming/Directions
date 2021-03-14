import { walnutNonAccessible, walnutAccessible } from "@/walnut";
import { assertValidBuilding, isValidBuilding } from "room-finder";

test("non-accessible walnut is a valid Building", () => {
  expect(isValidBuilding(walnutNonAccessible).connectedSections).toHaveLength(
    1
  );
  assertValidBuilding(walnutNonAccessible);
});
test("accessible walnut is a valid Building", () => {
  expect(isValidBuilding(walnutAccessible).connectedSections).toHaveLength(1);
  assertValidBuilding(walnutAccessible);
});

const routes = [
  ["2603", "2301"],
  ["2500", "3711"],
  ["3714", "1310"],
  ["2844", "1845"],
  ["Junior High Gym", "3112"],
  ["Band (1845)", "Black Box Theater"],
  ["2702", "3207"],
  ["1603", "2216"],
  ["2847", "3717"],
  ["1301", "2306"],
  ["Schott Recital Hall", "Main Office"],
  ["3103", "Choir"],
  ["2704", "3114"],
  ["1313", "3302"],
  ["Principal's Office", "1113"],
  ["1315", "3310"],
  ["3305", "3716"],
  ["3110", "3724"],
  ["2853", "3709"],
  ["3206", "1849"],
  ["1110", "1107"],
  ["1841", "2840"],
  ["1111", "3713"],
  ["Strings", "Band (1840)"],
  ["3301", "1843"],
  ["2211", "Computer Lab - Library"],
  ["3313", "2105"],
  ["2109", "1605"],
  ["2851", "2601"],
  ["Computer Lab - Engineering", "2722"],
  ["3105", "Library"],
  ["1106", "2709"],
  ["2401", "1846"],
  ["3202", "2114"],
  ["2852", "2857"],
  ["1311", "2701"],
  ["2210", "2717"],
  ["3303", "Athletic Director's Office"],
  ["1852", "2404"],
  ["2705", "2707"],
  ["2855", "1105"],
  ["2207", "3726"],
  ["Recital Hall", "2308"],
  ["2200", "2723"],
  ["1823", "2503"],
  ["2115", "Senior High Gym"],
  ["2611", "2307"],
  ["2607", "3315"],
  ["2215", "3214"],
  ["2843", "2739"],
  ["Conference Room", "1303"],
  ["3715", "3505"],
  ["2222", "3314"],
  ["2720", "Alumni Office"],
  ["2609", "3312"],
  ["Alumni Foundation", "Instrumental"],
  ["3204", "2212"],
  ["2800", "2310"],
  ["2842", "2111"],
  ["3117", "2201"],
  ["2219", "1824"],
  ["1608", "1108"],
  ["2218", "2715"],
  ["2103", "1305"],
  ["7-9 Administration Offices", "3205"],
  ["2101", "2113"],
  ["1842", "2714"],
  ["1309", "10th and 11th Grade Office"],
  ["2205", "2719"],
  ["3702", "3503"],
  ["Writing Center", "Registrar"],
  ["3311", "1314"],
  ["3704", "1300"],
  ["1606", "2311"],
  ["3101", "Language Lab"],
  ["2505", "2209"],
  ["2214", "2604"],
  ["2510", "Black Box Theatre"],
  ["1604", "10-11 Administration Office"],
  ["2801", "1857"],
  ["1602", "2204"],
  ["1312", "3115"],
  ["1850", "2849"],
  ["3201", "1607"],
  ["2713", "2403"],
  ["7th, 8th, and 9th Grade Office", "2202"],
  ["2848", "2302"],
  ["Medical Room", "2112"],
  ["1109", "2203"],
  ["3309", "Band (1850)"],
  ["1851", "3111"],
  ["3210", "Theater"],
  ["3703", "1853"],
  ["2110", "Counseling Office"],
  ["Nurse", "Forum"],
  ["1601", "2221"],
  ["2605", "2402"],
  ["2740", "1304"],
  ["Junior Gymnasium", "3102"],
  ["3104", "3504"],
  ["2229", "2716"],
  ["3707", "3113"],
  ["1840", "2846"],
  ["2703", "Scene Shop"],
  ["3208", "2309"],
  ["2602", "High School Gymnasium"],
  ["Westheimer Auditorium", "Auditorium"],
  ["3701", "Computer Lab"],
  ["3104", "3104"],
];

test.each(routes)("gives correct directions from %s to %s", (from, to) => {
  expect(
    walnutNonAccessible.getDirections(from.toString(), to.toString())
  ).toMatchSnapshot();
});

test.each(routes)(
  "gives correct accessible directions from %s to %s",
  (from, to) => {
    expect(
      walnutAccessible.getDirections(from.toString(), to.toString())
    ).toMatchSnapshot();
  }
);
