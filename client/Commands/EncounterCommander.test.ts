import { StatBlock } from "../../common/StatBlock";
import { Encounter } from "../Encounter/Encounter";
import { InitializeSettings } from "../Settings/Settings";
import { TrackerViewModel } from "../TrackerViewModel";
import { EncounterCommander } from "./EncounterCommander";

describe("EncounterCommander", () => {
  let encounter: Encounter;
  let encounterCommander: EncounterCommander;
  let trackerViewModel: TrackerViewModel;
  beforeEach(() => {
    window["$"] = require("jquery");
    InitializeSettings();

    const mockIo: any = {
      on: jest.fn(),
      emit: jest.fn()
    };

    trackerViewModel = new TrackerViewModel(mockIo);
    encounter = trackerViewModel.Encounter;
    encounterCommander = trackerViewModel.EncounterCommander;
    encounterCommander.StartEncounter();
  });

  test("Cannot start an empty encounter.", () => {
    expect(encounter.State()).toBe("inactive");
    expect(encounter.Combatants().length).toBe(0);
    expect(!encounter.ActiveCombatant());
  });

  test("Click Next Turn with no combatants.", () => {
    encounter.NextTurn = jest.fn(encounter.NextTurn);
    expect(!encounter.ActiveCombatant());
    encounterCommander.NextTurn();
    expect(encounter.RoundCounter() == 1);
    expect(encounter.NextTurn).not.toBeCalled();
  });

  test("Calling Next Turn should start an inactive encounter.", () => {
    const startEncounter = (encounterCommander.StartEncounter = jest.fn());

    encounter.AddCombatantFromStatBlock(StatBlock.Default());
    expect(!encounter.ActiveCombatant());
    encounterCommander.NextTurn();

    expect(startEncounter).toBeCalled();
  });
});
