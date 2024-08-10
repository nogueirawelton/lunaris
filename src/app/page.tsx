import Image from "next/image";

export default function Home() {
  return (
    <main>
      <form
        id="form-1"
        className="flex gap-2 flex-col max-w-sm"
      >
        <input
          className="border border-black"
          type="text"
          placeholder="Nome"
          name="nome"
          required
        />

        <input
          className="border border-black"
          type="email"
          placeholder="Email"
          name="email"
          required
        />

        <input
          className="border border-black"
          type="tel"
          placeholder="Telefone"
          name="telefone"
          required
        />

        <textarea
          name="mensagem"
          placeholder="Mensagem"
          className="border border-black"
        />

        <button
          type="submit"
          className="border  bg-zinc-100"
        >
          Enviar
        </button>
      </form>

      <form id="form-2">
        <input
          className="border border-black"
          type="text"
          placeholder="Nome"
          name="nome"
          required
        />

        <button
          type="submit"
          className="border  bg-zinc-100"
        >
          Enviar
        </button>
      </form>
    </main>
  );
}
