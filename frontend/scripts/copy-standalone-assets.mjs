import fs from "fs";
import path from "path";

const root = process.cwd();

const standaloneDir = path.join(
  root,
  ".next",
  "standalone"
);

const staticSource = path.join(
  root,
  ".next",
  "static"
);

const staticDestination = path.join(
  standaloneDir,
  ".next",
  "static"
);

const publicSource = path.join(
  root,
  "public"
);

const publicDestination = path.join(
  standaloneDir,
  "public"
);

fs.mkdirSync(
  path.dirname(staticDestination),
  {
    recursive: true,
  }
);

if (fs.existsSync(staticSource)) {
  fs.cpSync(
    staticSource,
    staticDestination,
    {
      recursive: true,
    }
  );

  console.log(
    "Copied .next/static to standalone."
  );
}

if (fs.existsSync(publicSource)) {
  fs.cpSync(
    publicSource,
    publicDestination,
    {
      recursive: true,
    }
  );

  console.log(
    "Copied public to standalone."
  );
}