export default function splitFullName(fullName: string): { FirstName: string; LastName: string } {
    const parts = fullName.trim().split(/\s+/);

    if (parts.length === 0) return { FirstName: "", LastName: "" };
    if (parts.length === 1) return { FirstName: parts[0], LastName: "" };

    const lastName = parts[parts.length - 1];
    const firstName = parts.slice(0, -1).join(" ");

    return { FirstName: firstName, LastName: lastName };
}
