async function loadSCMenus(client) {
  const { loadFiles } = require("../Functions/fileLoader");
  const ascii = require("ascii-table");
  const table = new ascii().setHeading("SCMenus", "Status");

  await client.scmenus.clear();

  const Files = await loadFiles("SCMenus");

  Files.forEach((file) => {
    const scmenu = require(file);

    client.scmenus.set(scmenu.id, scmenu);

    table.addRow(scmenu.id, "🟩");
  });

  return console.log(table.toString(), "\nSCMenus Loaded.");
}

module.exports = { loadSCMenus };