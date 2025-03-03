export as namespace Conch;

type Permission = string;

type Role = string | "super-user";

type User = {};

type CommandContext = {};

type AnalysisInformation = {};

type Type<T> = {};

interface UI {
	bind_to: (input: Enum.KeyCode | Enum.UserInputType) => void;
}

interface Conch {
	execute: (src: string) => void;

	register_quick: (name: string, fn: (...args: any[]) => any, ...permissions: Permission[]) => void;

	register: <T extends any[]>(
		name: string,
		props: {
			description?: string;
			permissions: Permission[];
			arguments: () => T;
			callback: (...args: T) => any;
		},
	) => void;

	register_default_commands: () => void;

	initiate_default_lifecycle: () => void;

	register_type: <T>(
		type: string,
		data: {
			converts: (value: any) => T;
			// TODO: analysis
		},
	) => void;

	has_permissions: (user: User, ...permissions: Permission[]) => boolean;

	set_role_permissions: (role: string, ...permissions: string[]) => void;

	give_roles: (user: User, ...roles: Role[]) => void;

	remove_roles: (user: User, ...roles: Role[]) => void;

	get_user: (player: string | Player) => User;

	set_var: (global: string, value: unknown) => void;

	get_command_context: () => CommandContext;

	log: (kind: "warn" | "info" | "error" | "normal", text: string) => void;

	analyze: (src: string, where: number) => AnalysisInformation;

	args: {
		string: Type<string>;
		strings: Type<string[]>;
		number: Type<number>;
		numbers: Type<number[]>;
		boolean: Type<boolean>;
		booleans: Type<boolean[]>;
		table: Type<object>;
		vector: Type<Vector3>;
		vectors: Type<Vector3[]>;
		player: Type<Player>;
		players: Type<Player[]>;
		userinput: Type<Enum.UserInputType>;

		enum_new: <T extends string>(...values: T[]) => Type<T>;
	};

	ui: UI;
}

declare const conch: Conch;
export = conch;
