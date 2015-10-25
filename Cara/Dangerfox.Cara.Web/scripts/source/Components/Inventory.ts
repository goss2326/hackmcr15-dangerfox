module Dangerfox.Cara.Components
{
    export class Inventory
    {
        public inventory: Support.Collection<Item>;

        constructor()
        {
            this.inventory = new Support.Collection<Item>();
        }

        public Add(item: Item)
        {
            this.inventory.Add(item);
        }

        public UseItem(usedItem: Item)
        {
            for (var n = 0; n <= this.inventory.Count(); n++)
            {
                var item = this.inventory.GetItem(n);
                switch (item.type)
                {
                    case "potion":
                        this.inventory.Delete(n);
                        break;
                }
            } 
        }

        public GetItems()
        {
            return this.inventory.GetItems();
        }

        public GetPotion()
        {
            for (var i: number = 0; i < this.inventory.Count(); i++)
            {
                var potion = this.inventory.GetItem(i);
                if (potion.type == "potion")
                {
                    return potion;
                }
            }
        }
        public GetInventoryCount()
        {
            return this.inventory.Count();
        }
    } 
}