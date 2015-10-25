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
                if (item == usedItem)
                {
                    this.inventory.Delete(n);
                }
            } 
        }
    } 
}