import { hash } from "bcryptjs";

async function readPassword(): Promise<string> {
  if (process.stdin.isTTY) {
    throw new Error(
      "No password received. Pipe a password through standard input; no default is used.",
    );
  }

  const chunks: Buffer[] = [];
  for await (const chunk of process.stdin) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks)
    .toString("utf8")
    .replace(/\r?\n$/, "");
}

async function main(): Promise<void> {
  const password = await readPassword();
  if (password.length < 12) {
    throw new Error("Password must contain at least 12 characters.");
  }

  console.log(await hash(password, 12));
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "Hashing failed.");
  process.exitCode = 1;
});
