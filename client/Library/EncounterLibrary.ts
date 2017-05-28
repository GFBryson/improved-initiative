import { SavedEncounter, SavedCombatant } from "../Encounter/Encounter";
import { Store } from "../Utility/Store";
import { getClient } from "../Utility/ApplicationInsights";

export class EncounterLibrary {
    Index = ko.observableArray<string>([]);

    constructor() {
        Store.List(Store.SavedEncounters).forEach(e => this.Index.push(e));

        getClient().trackEvent("SavedEncounters", { Count: this.Index().length.toString() });
    }

    Save = (encounterName: string, savedEncounter: SavedEncounter<SavedCombatant>) => {
        if (this.Index().indexOf(encounterName) === -1) {
            this.Index.push(encounterName);
        }

        Store.Save(Store.SavedEncounters, encounterName, savedEncounter);
    }

    Delete = (encounterName: string) => {
        this.Index.remove(encounterName);
        Store.Delete(Store.SavedEncounters, encounterName);
    }

    Get = (encounterName: string) => {
        return Store.Load<SavedEncounter<SavedCombatant>>(Store.SavedEncounters, encounterName);
    }
}